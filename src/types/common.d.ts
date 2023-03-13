import type { QTableProps } from 'quasar';

interface IPagination {
    page: number;
    per_page: number;
}

interface IPaginationResponse extends IPagination {
    rows: number;
    total: number;
}

interface ITableProps {
    title: string;
    columns: QTableProps['columns'];
    rows: QTableProps['rows'];
    pagination: IPagination;
}

interface IActionProps<Errors = undefined, ResourceRow = undefined> {
    loading?: boolean;
    successMessage?: string;
    errors?: Errors;
    data?: ResourceRow;
}

export {
    IPagination, IPaginationResponse, ITableProps, IActionProps
};