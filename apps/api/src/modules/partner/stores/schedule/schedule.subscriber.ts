import { NotificationService } from 'src/modules/notification/notification.service';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { NotificationsHistory } from '../notifications/history/history.entity';
import { NotificationsHistoryService } from '../notifications/history/history.service';
import { Schedule } from './schedule.entity';

@EventSubscriber()
export class ScheduleSubscriber implements EntitySubscriberInterface<Schedule> {
  constructor(
    dataSource: DataSource,
    private readonly notificationsHistoryService: NotificationsHistoryService,
    private readonly notificationService: NotificationService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Schedule;
  }

  async afterInsert(event: InsertEvent<Schedule>) {
    const schedule = event.entity;

    if (schedule.store) {
      const history = new NotificationsHistory();
      history.type = 'booking';
      history.title = 'Novo Agendamento';
      history.message = `Agendamento criado para ${schedule.date} às ${schedule.startTime}`;
      history.timestamp = new Date();
      history.read = false;
      history.store = schedule.store;
      history.status = 'sent';

      if (schedule.user?.email) {
        history.recipient = schedule.user.email;

        await this.notificationService.sendEmail(
          schedule.user.email,
          'Novo Agendamento',
          `Seu agendamento para ${schedule.date} às ${schedule.startTime} foi criado.`,
        );
      }

      await this.notificationsHistoryService.create(history);
    }
  }

  async afterUpdate(event: UpdateEvent<Schedule>) {
    const schedule = event.entity as Schedule;

    // Verifica se houve mudança de status
    const statusChanged = event.updatedColumns.find(
      (col) => col.propertyName === 'status',
    );

    if (statusChanged && schedule.status && schedule.store) {
      const history = new NotificationsHistory();
      history.store = schedule.store;
      history.timestamp = new Date();
      history.read = false;
      history.status = 'sent';

      if (schedule.user?.email) {
        history.recipient = schedule.user.email;
      }

      if (schedule.status === 'cancelled') {
        history.type = 'cancellation';
        history.title = 'Agendamento Cancelado';
        history.message = `O agendamento para ${schedule.date} às ${schedule.startTime} foi cancelado.`;
      } else {
        history.type = 'booking';
        history.title = 'Atualização de Agendamento';
        history.message = `Status alterado para: ${schedule.status}`;
      }

      await this.notificationsHistoryService.create(history);
    }
  }
}
