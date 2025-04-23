import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
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
import { Button, buttonVariants } from "@/components/ui/button"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task List',
        href: '/task/show/',
    },
];

export default function Index({ tasks }: {tasks: Task[]}) {

    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')){
            router.delete(route('task.destroy', {id}));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task List" />
            <div className="">
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
                                <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTask(task.id) }>
                                    Delete
                                </Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}

