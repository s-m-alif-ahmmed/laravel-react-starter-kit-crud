import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useRef } from 'react';
import ImageUpload from '@/components/ImageUpload';

type CreateTaskForm = {
    name: string;
    image: File | null;
    images: File[] | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task Create',
        href: '/task/create',
    },
];

export default function Create() {
    const taskName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<CreateTaskForm>({
        name: '',
        image: null,
        images: null,
    });

    const createTask: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('task.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskName.current?.focus();
                }
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Create" />
            <div className="m-5">
                <Link className={(buttonVariants({ variant: 'default', className: 'mb-2' }))} href={route('task.index')}>
                    Task List
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Task</CardTitle>
                    </CardHeader>
                    <form onSubmit={createTask} encType="multipart/form-data">
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
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="image" className="mb-2">Image</Label>
                                    <ImageUpload
                                        value={data.image}
                                        onChange={(file) => setData('image', file as File | null)}
                                        className="h-[250px] w-full"
                                    />
                                    <InputError message={errors.image} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mt-4">
                                    <Label htmlFor="images" className="mb-2"><>Additional Images (Multiple)</L</>abel>
                                    <ImageUpload
                                        multiple
                                        value={data.images}
                                        onChange={(files) => setData('images', files as File[] | null)}
                                        className="w-full"
                                    />
                                    <InputError message={errors.images} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-5">
                            <Button type="button" variant="outline" onClick={() => reset()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Create
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
