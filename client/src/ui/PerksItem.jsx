function PerksItem({ perk, name, icon, register }) {
  return (
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
      <input type="checkbox" {...register(`${name}`)} />
      {icon}
      <span>{perk}</span>
    </label>
  );
}

export default PerksItem;
