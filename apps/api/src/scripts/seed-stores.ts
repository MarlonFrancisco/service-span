import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { createConnection } from 'typeorm';

interface MockService {
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
}

interface MockCategory {
  name: string;
  description: string;
  color: string;
  services: MockService[];
}

interface MockGallery {
  url: string;
  isMain: boolean;
}

interface MockReview {
  rating: number;
  comment: string;
}

interface MockBlockedTime {
  date: string;
  time: string;
  isRecurring?: boolean;
  dayOfWeek?: number;
}

interface MockStoreMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'professional';
  isActive: boolean;
  serviceNames?: string[];
  blockedTimes?: MockBlockedTime[];
}

interface MockSchedule {
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  storeMemberEmail: string;
  serviceName: string;
  customerEmail: string;
  notes?: string;
}

interface MockStore {
  name: string;
  description: string;
  amenities: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  telephone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  openTime: string;
  closeTime: string;
  lunchStartTime: string | null;
  lunchEndTime: string | null;
  businessDays: Record<string, boolean>;
  weeklyGoal: number;
  monthlyGoal: number;
  quarterlyGoal: number;
  isActive: boolean;
  categories: MockCategory[];
  gallery: MockGallery[];
  reviews: MockReview[];
  storeMembers?: MockStoreMember[];
  schedules?: MockSchedule[];
}

async function seedStoresSimple() {
  let connection;
  try {
    // Create connection without loading entities to avoid circular dependencies
    connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'service_snap',
    });

    console.log('✅ Database connection established');
    // Read JSON file
    const filePath = path.join(__dirname, 'stores-mock.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const storesData: MockStore[] = JSON.parse(fileContent);

    console.log(`📦 Loaded ${storesData.length} stores from JSON\n`);

    let totalStores = 0;
    let totalCategories = 0;
    let totalServices = 0;
    let totalGalleryImages = 0;
    let totalReviews = 0;
    let totalStoreMembers = 0;
    let totalBlockedTimes = 0;
    let totalSchedules = 0;

    // Seed data
    for (let i = 0; i < storesData.length; i++) {
      const mockStore = storesData[i];

      // Create or find owner
      const ownerEmail = `owner_${mockStore.name.toLowerCase().replace(/\s+/g, '_')}@test.com`;
      const owner = await connection.query(
        'SELECT id FROM users WHERE email = $1',
        [ownerEmail],
      );

      let ownerId: string;

      if (owner.length === 0) {
        const result = await connection.query(
          `INSERT INTO users (id, email, first_name, last_name, accepted_terms, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, 'Owner', $2, true, NOW(), NOW())
           RETURNING id`,
          [ownerEmail, mockStore.name],
        );
        ownerId = result[0].id;
      } else {
        ownerId = owner[0].id;
      }

      // Create store
      const storeResult = await connection.query(
        `INSERT INTO stores (
          id, name, description, amenities, address, city, state, "zipCode",
          telephone, email, website, instagram, facebook, "openTime", "closeTime",
          "lunchStartTime", "lunchEndTime", "businessDays", "weeklyGoal", "monthlyGoal",
          "quarterlyGoal", "isActive", "isDeleted", "ownerId", created_at, updated_at
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, NOW(), NOW()
        ) RETURNING id`,
        [
          mockStore.name,
          mockStore.description,
          JSON.stringify(mockStore.amenities),
          mockStore.address,
          mockStore.city,
          mockStore.state,
          mockStore.zipCode,
          mockStore.telephone,
          mockStore.email,
          mockStore.website,
          mockStore.instagram,
          mockStore.facebook,
          mockStore.openTime,
          mockStore.closeTime,
          mockStore.lunchStartTime,
          mockStore.lunchEndTime,
          JSON.stringify(mockStore.businessDays),
          mockStore.weeklyGoal,
          mockStore.monthlyGoal,
          mockStore.quarterlyGoal,
          mockStore.isActive,
          false,
          ownerId,
        ],
      );

      const storeId = storeResult[0].id;
      totalStores++;

      // Create categories and services
      for (const mockCategory of mockStore.categories) {
        const categoryResult = await connection.query(
          `INSERT INTO categories (id, name, description, color, "storeId", created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
           RETURNING id`,
          [
            mockCategory.name,
            mockCategory.description,
            mockCategory.color,
            storeId,
          ],
        );

        const categoryId = categoryResult[0].id;
        totalCategories++;

        // Create services
        for (const mockService of mockCategory.services) {
          await connection.query(
            `INSERT INTO services (
              id, name, description, duration, price, "isActive", "storeId", "categoryId", created_at, updated_at
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
            )`,
            [
              mockService.name,
              mockService.description,
              mockService.duration,
              mockService.price,
              mockService.isActive,
              storeId,
              categoryId,
            ],
          );

          totalServices++;
        }
      }

      // Create gallery images
      for (const mockGallery of mockStore.gallery) {
        await connection.query(
          `INSERT INTO gallery (id, url, "isMain", "storeId", created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())`,
          [mockGallery.url, mockGallery.isMain, storeId],
        );

        totalGalleryImages++;
      }

      // Create reviews
      for (const mockReview of mockStore.reviews || []) {
        // Create or find reviewer user
        const reviewerEmail = `reviewer_${mockStore.name.toLowerCase().replace(/\s+/g, '_')}_${totalReviews}@test.com`;
        const reviewer = await connection.query(
          'SELECT id FROM users WHERE email = $1',
          [reviewerEmail],
        );

        let reviewerId: string;

        if (reviewer.length === 0) {
          const result = await connection.query(
            `INSERT INTO users (id, email, first_name, last_name, accepted_terms, created_at, updated_at)
             VALUES (gen_random_uuid(), $1, 'Reviewer', 'User', true, NOW(), NOW())
             RETURNING id`,
            [reviewerEmail],
          );
          reviewerId = result[0].id;
        } else {
          reviewerId = reviewer[0].id;
        }

        await connection.query(
          `INSERT INTO reviews (id, rating, comment, "userId", "storeId", created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())`,
          [mockReview.rating, mockReview.comment, reviewerId, storeId],
        );

        totalReviews++;
      }

      // Create store members
      for (const mockMember of mockStore.storeMembers || []) {
        // Create or find professional user
        const memberEmail = mockMember.email;
        const memberUser = await connection.query(
          'SELECT id FROM users WHERE email = $1',
          [memberEmail],
        );

        let memberId: string;

        if (memberUser.length === 0) {
          const result = await connection.query(
            `INSERT INTO users (id, email, telephone, first_name, last_name, accepted_terms, created_at, updated_at)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW())
             RETURNING id`,
            [memberEmail, mockMember.phone, mockMember.name.split(' ')[0], mockMember.name.split(' ')[1] || ''],
          );
          memberId = result[0].id;
        } else {
          memberId = memberUser[0].id;
        }

        // Create store member
        const memberResult = await connection.query(
          `INSERT INTO store_members (id, "userId", "storeId", role, "isActive", "isDeleted", created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, false, NOW(), NOW())
           RETURNING id`,
          [memberId, storeId, mockMember.role, mockMember.isActive],
        );

        const storeMemberId = memberResult[0].id;
        totalStoreMembers++;

        // Create service assignments for this member
        for (const serviceName of mockMember.serviceNames || []) {
          const serviceResult = await connection.query(
            `SELECT id FROM services WHERE name = $1 AND "storeId" = $2`,
            [serviceName, storeId],
          );

          if (serviceResult.length === 0) {
            console.warn(`⚠️  Service "${serviceName}" not found for member "${mockMember.name}" in store "${mockStore.name}"`);
            continue;
          }

          const serviceId = serviceResult[0].id;

          // Create junction table entry
          await connection.query(
            `INSERT INTO store_members_services (store_member_id, service_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [storeMemberId, serviceId],
          );
        }

        // Create blocked times for this member
        for (const blockedTime of mockMember.blockedTimes || []) {
          await connection.query(
            `INSERT INTO blocked_times (id, "storeMemberId", date, time, "isRecurring", "dayOfWeek", created_at, updated_at)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
            [
              storeMemberId,
              blockedTime.date,
              blockedTime.time,
              blockedTime.isRecurring || false,
              blockedTime.dayOfWeek || null,
            ],
          );

          totalBlockedTimes++;
        }
      }

      // Create schedules
      for (const mockSchedule of mockStore.schedules || []) {
        // Find service by name
        const serviceResult = await connection.query(
          'SELECT id FROM services WHERE name = $1 AND "storeId" = $2',
          [mockSchedule.serviceName, storeId],
        );

        if (serviceResult.length === 0) {
          console.warn(`⚠️  Service "${mockSchedule.serviceName}" not found in store "${mockStore.name}", skipping schedule`);
          continue;
        }

        const serviceId = serviceResult[0].id;

        // Find or create store member by email
        const storeMemberResult = await connection.query(
          `SELECT sm.id FROM store_members sm
           JOIN users u ON sm."userId" = u.id
           WHERE u.email = $1 AND sm."storeId" = $2`,
          [mockSchedule.storeMemberEmail, storeId],
        );

        if (storeMemberResult.length === 0) {
          console.warn(`⚠️  Store member with email "${mockSchedule.storeMemberEmail}" not found in store "${mockStore.name}", skipping schedule`);
          continue;
        }

        const storeMemberId = storeMemberResult[0].id;

        // Find or create customer user
        let customerResult = await connection.query(
          'SELECT id FROM users WHERE email = $1',
          [mockSchedule.customerEmail],
        );

        let customerId: string;

        if (customerResult.length === 0) {
          const result = await connection.query(
            `INSERT INTO users (id, email, first_name, last_name, accepted_terms, created_at, updated_at)
             VALUES (gen_random_uuid(), $1, 'Customer', 'Test', true, NOW(), NOW())
             RETURNING id`,
            [mockSchedule.customerEmail],
          );
          customerId = result[0].id;
        } else {
          customerId = customerResult[0].id;
        }

        // Insert schedule
        await connection.query(
          `INSERT INTO schedules (id, date, "startTime", "endTime", status, "storeMemberId", "serviceId", "userId", "storeId", notes, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
          [
            mockSchedule.date,
            mockSchedule.startTime,
            mockSchedule.endTime,
            mockSchedule.status,
            storeMemberId,
            serviceId,
            customerId,
            storeId,
            mockSchedule.notes || null,
          ],
        );

        totalSchedules++;
      }

      console.log(`✅ Store ${i + 1}/${storesData.length}: ${mockStore.name}`);
    }

    console.log('');
    console.log('✨ Seeding completed successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Stores created: ${totalStores}`);
    console.log(`   - Categories created: ${totalCategories}`);
    console.log(`   - Services created: ${totalServices}`);
    console.log(`   - Gallery images created: ${totalGalleryImages}`);
    console.log(`   - Reviews created: ${totalReviews}`);
    console.log(`   - Store members created: ${totalStoreMembers}`);
    console.log(`   - Blocked times created: ${totalBlockedTimes}`);
    console.log(`   - Schedules created: ${totalSchedules}`);

    await connection.close();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    if (connection) {
      await connection.close();
    }
    process.exit(1);
  }
}

// Run the seed
void seedStoresSimple();
