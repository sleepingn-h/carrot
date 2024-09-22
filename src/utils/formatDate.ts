import type { Timestamp } from '@/model/article';
import moment from 'moment';
import 'moment/locale/ko';

export default function formatDate(timestamp: Timestamp) {
  return moment(timestamp.seconds * 1000)
    .locale('ko')
    .fromNow();
}
