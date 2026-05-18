export type MonthlyStat = {
    _id: number | null;
    count: number;
};

export type DashboardStats = {
    usersCount: number;

    propertiesCount: number;

    availableProperties: number;

    soldOrRented: number;

    propertiesPerMonth: MonthlyStat[];

    usersPerMonth: MonthlyStat[];
};
