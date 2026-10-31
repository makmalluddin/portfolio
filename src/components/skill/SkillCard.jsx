function SkillCard({ skill }) {
  const { CategoryIcon, category, tools } = skill;

  return (
    <div className="flex flex-col py-8 px-8 border-b border-r border-border-muted h-full">
      <div className="flex items-center gap-4 pb-8">
        <div className="border border-border-muted p-2">
          <CategoryIcon className="size-6 text-text-secondary" />
        </div>
        <p className="text-text-primary font-medium text-xl md:text-2xl scale-y-90">
          {category}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center gap-2">
            <img
              src={tool.iconUrl}
              alt={tool.name}
              className="size-6 shrink-0 object-contain opacity-70"
            />
            <p className="font-medium">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;
