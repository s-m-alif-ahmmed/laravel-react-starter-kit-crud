import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
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
import { FormEventHandler, useRef, useState } from 'react';
import { type Task } from '@/types';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';

type EditTaskForm = {
    name: string;
    image: File | string | null;
    images: File[] | string[] | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Task Edit', href: '/task/edit' },
];

export default function Edit({ task }: { task: Task }) {
    const taskName = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<EditTaskForm>({
        name: task.name ?? '',
        image: task.image ?? null,
        images: null, // Note: You'll likely need to parse existing multiple images from `task` similar to `image` depending on your backend
    });

    const [errors, setErrors] = useState<{ name?: string; image?: string; images?: string }>({});
    const [processing, setProcessing] = useState(false);

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', data.name);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        if (Array.isArray(data.images)) {
            data.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append('images[]', file);
                }
            });
        }
        formData.append('_method', 'PUT');

        router.post(route('task.update', task.id), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setData({ ...data, image: null });
                toast.success('Task updated successfully.');
            },
            onError: (err) => {
                setErrors(err);
                if (err.name) taskName.current?.focus();
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Edit" />
            <div className="m-5">
                <Link className={buttonVariants({ variant: 'default', className: 'mb-2' })} href={route('task.index')}>
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
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="Name of your task"
                                        disabled={processing}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="flex flex-col space-y-1.5 mt-4">
                                    <Label className="mb-2" htmlFor="image">Image</Label>
                                    <ImageUpload
                                        value={data.image}
                                        onChange={(file) =>
                                            setData({ ...data, image: file as File | null })
                                        }
                                        className=""
                                    />
                                    <InputError message={errors.image} />
                                </div>

                                <div className="flex flex-col space-y-1.5 mt-4">
                                    <Label className="mb-2" htmlFor="images">Additional Images (Multiple)</Label>
                                    <ImageUpload
                                        multiple
                                        value={data.images}
                                        onChange={(files) =>
                                            setData({ ...data, images: files as File[] | null })
                                        }
                                        className=""
                                    />
                                    <InputError message={errors.images} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-5">
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
