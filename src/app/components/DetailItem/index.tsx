interface DetailItemProps {
  item: { label: string; value: number };
  index: number;
}

const DetailItem = ({ item, index }: DetailItemProps) => {
  return (
    <div key={item.label} className={`flex justify-between my-1`}>
      <div
        className={`w-3/4 mr-1 rounded-md py-2 ${
          index % 2 === 0 ? "bg-white" : "bg-slate-100"
        }`}
      >
        <p className="text-sm font-bold capitalize pl-4">{item.label}</p>
      </div>

      <div
        className={`w-1/4 text-right rounded-md py-2 ${
          index % 2 === 0 ? "bg-white" : "bg-slate-100"
        }`}
      >
        <p className="text-sm font-bold pl-2 pr-4">{item.value}</p>
      </div>
    </div>
  );
};

export default DetailItem;
