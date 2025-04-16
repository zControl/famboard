import { PageContainer } from '@/components/common/PageContainer'
import { InfoCard } from '@/components/composites/InfoCard'
import { ActivityLogSummary } from '@/features/admin/components/ActivityLogSummary'
import { RewardsSummary } from '@/features/admin/components/RewardsSummary'
import { StatusBar } from '@/features/admin/components/StatusBar'
import { TasksSummary } from '@/features/admin/components/TasksSummary'
import { UserStatistics } from '@/features/admin/components/UserStatistics'
import { createFileRoute } from '@tanstack/react-router'
import { IceCream2Icon } from 'lucide-react'

export const Route = createFileRoute('/(app)/_admin/admin/')({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <PageContainer title='Admin | Dashboard' description='Shows admin cards and common admin functions'>
      <StatusBar />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard title="Users" description="Basic user statistics" icon={<IceCream2Icon />}>
          <UserStatistics />
        </InfoCard>
        <InfoCard title="Tasks" description="Tasks summary" icon={<IceCream2Icon />}>
          <TasksSummary />
        </InfoCard>
        <InfoCard title="Rewards" description="Total Rewards" icon={<IceCream2Icon />}>
          <RewardsSummary />
        </InfoCard>
        <InfoCard title="Activity" description="Recent event summary" icon={<IceCream2Icon />}>
          <ActivityLogSummary />
        </InfoCard>
      </div>
      <div>
        DEBUG MESSAGES
      </div>

    </PageContainer>
  )
}
