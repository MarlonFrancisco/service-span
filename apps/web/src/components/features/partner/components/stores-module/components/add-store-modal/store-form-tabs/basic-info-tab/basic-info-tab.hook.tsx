import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useBasicInfoTab = () => {
  const form = useFormContext<TStoreFormSchema>();

  const [customAmenity, setCustomAmenity] = useState('');

  const amenities = form.watch('amenities');

  const onAddCustomAmenity = () => {
    form.setValue('amenities', [...amenities, customAmenity]);
  };

  const onRemoveAmenity = (amenity: string) => {
    form.setValue(
      'amenities',
      amenities.filter((a) => a !== amenity),
    );
  };

  return {
    form,
    amenities,
    customAmenity,
    setCustomAmenity,
    onAddCustomAmenity,
    onRemoveAmenity,
  };
};
