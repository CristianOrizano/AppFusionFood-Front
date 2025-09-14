import AppBarChart from '@/components/bar-chart';
import { AppPieChart } from '@/components/pie-chart';
import { SectionCards } from '@/components/section-cards';

const index = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="mb-2 flex justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 ">
            <SectionCards />
            <div className="grid gap-4 grid-cols-12">
              <div className="col-span-12 md:col-span-7">
                <AppBarChart />
              </div>
              <div className="col-span-12 md:col-span-5">
                <AppPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
