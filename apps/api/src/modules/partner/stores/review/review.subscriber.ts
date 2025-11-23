import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { NotificationsHistory } from '../notifications/history/history.entity';
import { NotificationsHistoryService } from '../notifications/history/history.service';
import { Review } from './review.entity';

@EventSubscriber()
export class ReviewSubscriber implements EntitySubscriberInterface<Review> {
  constructor(
    dataSource: DataSource,
    private readonly notificationsHistoryService: NotificationsHistoryService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Review;
  }

  async afterInsert(event: InsertEvent<Review>) {
    const review = event.entity;

    if (review.store) {
      const history = new NotificationsHistory();
      history.type = 'system';
      history.title = 'Nova Avaliação';
      history.message = `Nova avaliação recebida: ${review.rating} estrelas${review.comment ? ` - "${review.comment}"` : ''}`;
      history.timestamp = new Date();
      history.read = false;
      history.store = review.store;
      history.status = 'delivered';

      if (review.user?.email) {
        history.recipient = review.user.email;
      }

      await this.notificationsHistoryService.create(history);
    }
  }
}
