/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const DiaryCalendar = lazy(() => import('@/features/diary/pages/DiaryCalendar'))
const DiaryPhotoSelect = lazy(
  () => import('@/features/diary/pages/DiaryPhotoSelect'),
)
const DiaryPhotoCapture = lazy(
  () => import('@/features/diary/pages/DiaryPhotoCapture'),
)
const DiaryPhotoCaptureComplete = lazy(
  () => import('@/features/diary/pages/DiaryPhotoCaptureComplete'),
)
const DiaryAnalyzeInProgress = lazy(
  () => import('@/features/diary/pages/DiaryAnalyzeInProgress'),
)
const DiaryRecordScoreStep = lazy(
  () => import('@/features/diary/pages/DiaryRecordScoreStep'),
)
const DiaryRecordChecklist = lazy(
  () => import('@/features/diary/pages/DiaryRecordChecklist'),
)
const DiaryRecordDiary = lazy(
  () => import('@/features/diary/pages/DiaryRecordDiary'),
)

export const DiaryRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<DiaryCalendar />),
    handle: { title: '기록' },
  },
  {
    path: 'photo-select',
    element: withSuspense(<DiaryPhotoSelect />),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'photo-capture',
    element: withSuspense(<DiaryPhotoCapture />),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'photo-capture/complete',
    element: withSuspense(<DiaryPhotoCaptureComplete />),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'analyze',
    element: withSuspense(<DiaryAnalyzeInProgress />),
    handle: { title: '분석 중' },
  },
  {
    path: 'record/:step',
    element: withSuspense(<DiaryRecordScoreStep />),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'record/checklist',
    element: withSuspense(<DiaryRecordChecklist />),
    handle: { title: '오늘의 기록' },
  },
  {
    path: 'record/diary',
    element: withSuspense(<DiaryRecordDiary />),
    handle: { title: '오늘의 기록' },
  },
]
