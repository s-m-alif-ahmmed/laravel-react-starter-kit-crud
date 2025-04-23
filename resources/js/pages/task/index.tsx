import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { type Task} from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
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


export default function Index({ tasks }: {tasks: Task[]}) {

    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')){
            router.delete(route('task.destroy', {id}));
            toast.success('Task Delete successfully!');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List" />
            <div className="m-5">
                <Link className={buttonVariants({ variant: 'outline'})} href="/task/create">
                    Create
                </Link>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell>{task.image}</TableCell>
                                <TableCell>
                                    <Link className={buttonVariants({ variant: 'default'})} href={`/task/${task.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer, mx-2'} onClick={() => deleteTask(task.id) }>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}

