import { prisma } from './src/config/db.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'Asia/Taipei'
const main = async() => {
  const yesterday = dayjs().tz(tz).subtract(1, 'day').startOf("day")
  const dayBeforeYesterday = dayjs().tz(tz).subtract(2, 'day').startOf("day")
  
  let events = await prisma.activities.findMany({
    where: {
      event_time: {
        lte: yesterday,
        gte: dayBeforeYesterday
      },
      status: 'registrationOpen'
    }
  })

  if( events.length === 0){
    // 昨天沒活動
    return
  }
  console.log(events)
  const modifiedEvents = events.map((event) => {
    return prisma.activities.update({
      where: { id: event.id },
      data: {
        status: 'completed'
      }
    })
  })

  await Promise.all(modifiedEvents)
}

main()

