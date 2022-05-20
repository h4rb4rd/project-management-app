export interface ITask {
    id: string,
    title: string,
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
}
