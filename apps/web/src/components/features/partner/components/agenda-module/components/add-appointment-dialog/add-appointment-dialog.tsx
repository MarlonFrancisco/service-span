'use client';
import { useAgenda } from '@/store/admin/agenda';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@repo/ui';
import { toast } from 'sonner';

export function AddAppointmentDialog() {
  const {
    isAddAppointmentOpen,
    appointmentForm,
    professionals,
    services,
    timeSlots,
    setIsAddAppointmentOpen,
    setAppointmentForm,
    resetAppointmentForm,
    addAppointment,
  } = useAgenda();

  const handleSubmit = () => {
    if (
      !appointmentForm.clientName ||
      !appointmentForm.service ||
      !appointmentForm.professional
    ) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const selectedService = services.find(
      (s) => s.id === appointmentForm.service,
    );
    const professional = professionals.find(
      (p) => p.id === appointmentForm.professional,
    );

    if (!selectedService || !professional) return;

    const calculateEndTime = (startTime: string, durationMinutes: number) => {
      const [hours, minutes] = startTime.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + durationMinutes;
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    };

    const endTime = calculateEndTime(
      appointmentForm.startTime,
      parseInt(appointmentForm.duration),
    );

    addAppointment({
      clientName: appointmentForm.clientName,
      clientPhone: appointmentForm.clientPhone,
      clientEmail: appointmentForm.clientEmail,
      service: selectedService.name,
      professional: professional.name,
      startTime: appointmentForm.startTime,
      endTime: endTime,
      date: appointmentForm.date,
      status: 'scheduled',
      price: selectedService.price,
      notes: appointmentForm.notes,
    });

    setIsAddAppointmentOpen(false);
    resetAppointmentForm();
    toast.success('Agendamento criado com sucesso!');
  };

  const handleClose = () => {
    setIsAddAppointmentOpen(false);
    resetAppointmentForm();
  };

  return (
    <Dialog open={isAddAppointmentOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Cliente *</Label>
            <Input
              placeholder="Digite o nome completo"
              value={appointmentForm.clientName}
              onChange={(e) =>
                setAppointmentForm({ clientName: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                placeholder="(11) 99999-9999"
                value={appointmentForm.clientPhone}
                onChange={(e) =>
                  setAppointmentForm({ clientPhone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={appointmentForm.clientEmail}
                onChange={(e) =>
                  setAppointmentForm({ clientEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Serviço *</Label>
            <Select
              value={appointmentForm.service}
              onValueChange={(value) => {
                const selectedService = services.find((s) => s.id === value);
                setAppointmentForm({
                  service: value,
                  duration: selectedService?.duration.toString() || '60',
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.duration}min - R$ {service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Profissional *</Label>
            <Select
              value={appointmentForm.professional}
              onValueChange={(value) =>
                setAppointmentForm({ professional: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.name} - {prof.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Data *</Label>
              <Input
                type="date"
                value={appointmentForm.date}
                onChange={(e) => setAppointmentForm({ date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Horário *</Label>
              <Select
                value={appointmentForm.startTime}
                onValueChange={(value) =>
                  setAppointmentForm({ startTime: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea
              placeholder="Adicione informações importantes sobre o agendamento..."
              value={appointmentForm.notes}
              onChange={(e) => setAppointmentForm({ notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-black hover:bg-gray-800 text-white"
            >
              Criar Agendamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
