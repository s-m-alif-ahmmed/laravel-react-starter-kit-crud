import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedTasks } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { type Task } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from 'sonner';
import Pagination from '@/components/Pagination';
import PerPageSelect from '@/components/PerPageSelect';
import SearchInput from '@/components/SearchInput';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task List',
        href: '/task',
    },
];

export default function Index({ tasks }: { tasks: PaginatedTasks }) {

    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('task.destroy', { id }), {
                onSuccess: () => {
                    toast.success('Task deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete the task.');
                }
            });

        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List" />
            <div className="m-5">
                <Link className={buttonVariants({ variant: 'outline' })} href={route('task.create')}>
                    Create
                </Link>

                <PerPageSelect current={tasks.per_page} routeUrl="/task" />

                <SearchInput
                    placeholder="Search tasks..."
                    model="search"
                    routeUrl="/task"
                    defaultValue={new URLSearchParams(window.location.search).get('search') ?? ''}
                />


                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.data.map((task: Task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell>
                                    {task.image && (
                                        <img
                                            src={task.image ? `/${task.image}` : '/default.png'}
                                            alt="Task"
                                            className="w-32 h-auto rounded-md border"
                                        />

                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link className={`${buttonVariants({ variant: 'default' })} mx-1`} href={`/task/${task.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className="cursor-pointer mx-1" onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination links={tasks.links} />

            </div>
        </AppLayout>
    );
}
