import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task List',
        href: '/task',
    },
];

export default function Index({ tasks }: { tasks: any }) {

    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('task.destroy', { id }));
            toast.success('Task Delete successfully!');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List" />
            <div className="m-5">
                <Link className={buttonVariants({ variant: 'outline' })} href={route('task.create')}>
                    Create
                </Link>
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
                                            src={`/${task.image}`}
                                            alt="Task"
                                            className="w-32 h-auto rounded-md border"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link className={buttonVariants({ variant: 'default' })} href={`/task/${task.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer, mx-2'} onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-end items-end mt-4">
                    <div className="flex space-x-2">
                        {tasks.links.map((link: any) => (
                            <Link
                                key={link.label}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
