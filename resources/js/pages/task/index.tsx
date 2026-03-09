import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedTasks } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { type Task } from '@/types';
import { toast } from 'sonner';
import Table from '@/components/Table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task List',
        href: '/task'
    },
];
interface Props {
    tasks: PaginatedTasks;
    filters: {
        search: string;
        per_page: number;
    };
}

const columns = [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Image', key: 'image' },
    { label: 'Actions', key: 'actions' },
];

export default function Index({ tasks, filters }: Props) {
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
                <Link
                    className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    href={route('task.create')}
                >
                    Create
                </Link>

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
                                    <Link
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        href={`/task/${row.id}/edit`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
                        router.get(route('task.index'), {
                            page,
                            per_page: tasks.per_page,
                            search: filters.search,
                        }, { preserveState: true, replace: true });
                    }}
                    onPerPageChange={(perPage) => {
                        router.get(route('task.index'), {
                            page: 1,
                            per_page: perPage,
                            search: filters.search,
                        }, { preserveState: true, replace: true });
                    }}
                    onSearchChange={(search) => {
                        router.get(route('task.index'), {
                            page: 1,
                            per_page: tasks.per_page,
                            search,
                        }, { preserveState: true, replace: true });
                    }}
                    searchValue={filters.search}
                />
            </div>
        </AppLayout>
    );
}

