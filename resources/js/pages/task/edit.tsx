import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useRef } from 'react';
import { type Task } from '@/types';
import { toast } from 'sonner';

type EditTaskForm = {
    name: string;
    image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Task Edit', href: '/task/edit' },
];

export default function Edit({ task }: { task: Task }) {
    const taskName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, patch, reset, processing } = useForm<EditTaskForm>({
        name: task.name ?? '',
        image: null,
    });

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('task.update', task.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('image');
                toast.success('Task updated successfully.');
            },
            onError: (errors) => {
                if (errors.name) {
                    taskName.current?.focus();
                }
            }
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Edit" />
            <div className="m-5">
                <Link className={buttonVariants({ variant: 'default' })} href={route('task.index')}>
                    Task List
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Task</CardTitle>
                    </CardHeader>
                    <form onSubmit={editTask} encType="multipart/form-data">
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        ref={taskName}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Name of your task"
                                        disabled={processing}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {task.image && (
                                    <div className="flex flex-col space-y-1.5">
                                        <Label>Current Image</Label>
                                        <img
                                            src={`/${task.image}`}
                                            alt="Task"
                                            className="w-32 h-auto rounded-md border"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="image">Change Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.image} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-5">
                            <Button type="button" variant="outline" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Update
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
