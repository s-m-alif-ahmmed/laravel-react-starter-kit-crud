import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedTasks } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { type Task } from '@/types';
import { toast } from 'sonner';
import Table from '@/components/Table';
import { buttonVariants } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task List',
        href: '/task'
    },
];
interface Props {
    tasks: PaginatedTasks;
}

const columns = [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Image', key: 'image' },
    { label: 'Actions', key: 'actions' },
];

export default function Index({ tasks }: Props) {
    const queryParams = new URLSearchParams(window.location.search);
    const search = queryParams.get('search') || '';
    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('task.destroy', { id }), {
                onSuccess: () => toast.success('Task deleted successfully!'),
                onError: () => toast.error('Failed to delete the task.'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Task List', href: '/task' }]}>
            <Head title="Task List" />

            <div className="m-5">
                <div className="flex">
                    <Link className={(buttonVariants({ variant: 'default', className: 'mb-2 ml-auto' }))} href={route('task.create')}>
                        Task Create
                    </Link>
                </div>

                <Table<Task>
                    data={tasks.data}
                    total={tasks.total}
                    currentPage={tasks.current_page}
                    rowsPerPage={tasks.per_page}
                    columns={columns}
                    searchableKeys={['name']}
                    renderCell={(key, value, row) => {
                        if (key === 'image') {
                            return value ? (
                                <img
                                    src={`/${value}`}
                                    alt="Task"
                                    className="w-20 h-auto rounded border"
                                />
                            ) : (
                                <span>No image</span>
                            );
                        }

                        if (key === 'actions') {
                            return (
                                <div className="flex gap-2">

                                    <Link className={(buttonVariants({ variant: 'default' }))} href={`/task/${row.id}/edit`}>
                                        Edit
                                    </Link>

                                    <button
                                        className={(buttonVariants({ variant: 'default' }))}
                                        onClick={() => deleteTask(row.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        }

                        return value;
                    }}
                    onPageChange={(page) => {
                        const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
                        router.get(window.location.pathname, {
                            ...params,
                            page,
                        }, { preserveState: true, replace: true });
                    }}
                    onPerPageChange={(perPage) => {
                        const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
                        router.get(window.location.pathname, {
                            ...params,
                            page: 1,
                            per_page: perPage,
                        }, { preserveState: true, replace: true });
                    }}
                    onSearchChange={(searchVal) => {
                        const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
                        if (searchVal) {
                            params.search = searchVal;
                        } else {
                            delete params.search;
                        }
                        router.get(window.location.pathname, {
                            ...params,
                            page: 1,
                        }, { preserveState: true, replace: true });
                    }}
                    searchValue={search}
                />
            </div>
        </AppLayout>
    );
}

