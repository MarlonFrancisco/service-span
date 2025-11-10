'use client';

import { NotFound } from '@/components/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@repo/ui';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useBookingsSection } from './bookings-section.hook';

export const BookingsSection = () => {
  const {
    upcomingBookings,
    pastBookings,
    selectedBooking,
    bookingToCancel,
    setSelectedBooking,
    setBookingToCancel,
    handleCancelBooking,
  } = useBookingsSection();

  const router = useRouter();

  if (upcomingBookings.length === 0 && pastBookings.length === 0) {
    return (
      <NotFound
        title="Nenhum agendamento encontrado"
        description="Você ainda não tem nenhum agendamento. Clique no botão abaixo para explorar os serviços disponíveis."
        actionLabel="Explorar serviços"
        onAction={() => router.push('/')}
        className="min-h-auto"
      />
    );
  }

  return (
    <>
      <motion.div
        key="bookings"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">Próximos agendamentos</h3>
                <p className="text-gray-600">Seus compromissos confirmados</p>
              </div>
              <Badge variant="outline" className="border-gray-300 px-3 py-1">
                {upcomingBookings.length}{' '}
                {upcomingBookings.length === 1 ? 'agendamento' : 'agendamentos'}
              </Badge>
            </div>
            <div className="space-y-5">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-gray-200 overflow-hidden hover:border-gray-300 py-0">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Enhanced Image Section */}
                        <div className="relative lg:w-80 xl:w-96 h-64 lg:h-auto overflow-hidden flex-shrink-0">
                          <img
                            src={booking.store.gallery[0]?.url ?? ''}
                            alt={booking.store.name ?? ''}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>

                        {/* Enhanced Content Section */}
                        <div className="flex-1 p-6 lg:p-8">
                          {/* Header with Actions */}
                          <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                {booking.store.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-4">
                                {booking.service.name}
                              </p>

                              {/* Professional Info */}
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Users className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="text-sm text-gray-900">
                                  {booking.storeMember.user.firstName}{' '}
                                  {booking.storeMember.user.lastName}
                                </div>
                              </div>
                            </div>

                            {/* Price Tag */}
                            <div className="ml-4 text-right flex-shrink-0">
                              <div className="text-xs text-gray-500 mb-1">
                                Total
                              </div>
                              <div className="text-gray-900">
                                <span className="text-sm">
                                  R$ {booking.service.price}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Timeline Info Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="relative pl-12">
                              <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-500 mb-1">
                                Data
                              </div>
                              <div className="text-sm text-gray-900">
                                {booking.date}
                              </div>
                            </div>

                            <div className="relative pl-12">
                              <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Clock className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-500 mb-1">
                                Horário
                              </div>
                              <div className="text-sm text-gray-900">
                                {booking.startTime} - {booking.endTime}
                              </div>
                            </div>

                            <div className="relative pl-12">
                              <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-500 mb-1">
                                Local
                              </div>
                              <div className="text-sm text-gray-900 line-clamp-1">
                                {booking.store.address}
                              </div>
                            </div>

                            <div className="relative pl-12">
                              <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Phone className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-500 mb-1">
                                Contato
                              </div>
                              <div className="text-sm text-gray-900">
                                {booking.store.telephone}
                              </div>
                            </div>
                          </div>

                          {/* Actions Bar */}
                          <div className="flex gap-2 pt-6 border-t border-gray-100">
                            <Button
                              variant="outline"
                              onClick={() => setSelectedBooking(booking)}
                              className="flex-1 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors group/btn"
                            >
                              <span>Ver detalhes</span>
                              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setBookingToCancel(booking)}
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">Histórico</h3>
                <p className="text-gray-600">Seus agendamentos concluídos</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pastBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-500 overflow-hidden py-0">
                    <CardContent className="p-0">
                      {/* Image with overlay */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={booking.store.gallery[0]?.url ?? ''}
                          alt={booking.store.name ?? ''}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Status Badge */}
                        <Badge className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg">
                          <Check className="h-3 w-3 mr-1" />
                          Concluído
                        </Badge>

                        {/* Quick action on hover */}
                        <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button
                            size="sm"
                            className="w-full bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
                          >
                            <Calendar className="h-3.5 w-3.5 mr-2" />
                            Reservar novamente
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors">
                              {booking.store.name}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {booking.service.name}
                            </p>
                          </div>
                          <div className="ml-3 text-right flex-shrink-0">
                            <div className="text-sm text-gray-900">
                              R$ {booking.service.price}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-gray-600 text-center">
                            <MessageCircle className="h-4 w-4 inline mr-1.5" />
                            Avalie este serviço
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {new Date(booking.date).toLocaleDateString(
                                'pt-BR',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                          >
                            <Star className="h-3.5 w-3.5 mr-1.5" />
                            Avaliar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Booking Details Modal */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(undefined)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Detalhes do agendamento
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-1">
                  {selectedBooking.store.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedBooking.service.name}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-900">
                        {new Date(selectedBooking.date).toLocaleDateString(
                          'pt-BR',
                          {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          },
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">
                      {selectedBooking.startTime} - {selectedBooking.endTime}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">
                      {selectedBooking.store.address}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-900">
                      {selectedBooking.store.telephone}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Profissional</span>
                <span className="text-gray-900">
                  {selectedBooking.storeMember.user.firstName}{' '}
                  {selectedBooking.storeMember.user.lastName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valor total</span>
                <span className="text-gray-900">
                  R$ {selectedBooking.service.price}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!bookingToCancel}
        onOpenChange={() => setBookingToCancel(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar agendamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar este agendamento?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelBooking}>
              Cancelar agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
