import { useGetGooglePlacesDetail } from '@/apis/services/google/places/useService';
import EtcBlock from '@/app/(fullscreen)/plans/[articleId]/_components/scheduleBlocks/EtcBlock';
import PlanBlock from '@/app/(fullscreen)/plans/[articleId]/_components/scheduleBlocks/PlanBlock';
import TransportBlock from '@/app/(fullscreen)/plans/[articleId]/_components/scheduleBlocks/TransportBlock';
import { TabBlockProps } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetailDragAndDrop.type';

export default function TravelTabBlock({ schedule, ...props }: TabBlockProps) {
  const generalPlaceId = schedule.schedule_general?.google_map_place_id || '';
  const { data: generalPlaceData } = useGetGooglePlacesDetail(generalPlaceId);

  if (schedule.dtype === 'GENERAL') {
    if (!schedule.schedule_general) return;
    return (
      <PlanBlock
        index={schedule.sort_order}
        name={schedule.schedule_general.place_name}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        photoName={generalPlaceData?.body.photos?.[0].name}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    if (!schedule.schedule_transport) return;
    const { start_place_name, end_place_name } = schedule.schedule_transport;
    return (
      <TransportBlock
        index={schedule.sort_order}
        name={start_place_name + ' → ' + end_place_name}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        transport={schedule.schedule_transport?.transportation}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    if (!schedule.schedule_etc) return;
    return (
      <EtcBlock
        index={schedule.sort_order}
        name={schedule.schedule_etc.place_name}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        {...props}
      />
    );
  }
}
