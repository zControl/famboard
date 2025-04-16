import { ButtonLink } from "@/components/composites/ButtonLink"
import { IceCream2Icon } from "lucide-react"

export const TasksSummary = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg font-bold">Tasks Summary</div>
      <div className="text-sm text-gray-500">This is a summary of tasks.</div>
      <div className="flex flex-row space-x-2">
        <ButtonLink href="/tasks" icon={<IceCream2Icon />}>
          View All Tasks
        </ButtonLink>
        <ButtonLink href="/tasks/create" icon={<IceCream2Icon />}>
          Create Task
        </ButtonLink>
      </div>
    </div>
  )
}