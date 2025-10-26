import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private readonly storage: SupabaseClient['storage'];

  constructor(private readonly configService: ConfigService) {
    this.storage = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_API_KEY'),
    ).storage;
  }

  async uploadFile({
    bucket,
    filePath,
    file,
  }: {
    bucket: string;
    filePath: string;
    file: Buffer;
  }) {
    const { data, error } = await this.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    return data.path;
  }

  async deleteFile({ bucket, path }: { bucket: string; path: string }) {
    const { error } = await this.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(error.message);
    }
  }
}
