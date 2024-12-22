import { AppLogo } from '@/components/common/AppLogo'
import { HeaderContainer } from '@/components/common/HeaderContainer'
import { PageContainer } from '@/components/common/PageContainer'
import { Spinner } from '@/components/ui/spinner'
import { useFormattedTimestamp } from '@/hooks/useFormattedTimestamp'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/status')({
  component: StatusPage,
})

function StatusPage() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['status'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/v1/status')
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
      }
      return await res.json()
    },
  })

  const formattedTimestamp = useFormattedTimestamp(data?.timestamp ?? '')

  if (isPending || isFetching) return <Spinner size="xl" />

  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <>
      <HeaderContainer logo={<AppLogo />} />
      <PageContainer
        title="Status Page"
        description="Show the status of the web services and API endpoints"
      >
        {data.status === 'ok' && <div className="h-10 w-full bg-primary" />}

        <div>STATUS TABLE HERE</div>
        <div className="text-center">Last updated: {formattedTimestamp}</div>
      </PageContainer>
    </>
  )
}
