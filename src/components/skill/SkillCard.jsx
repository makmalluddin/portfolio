function SkillCard({ skill }) {
  const { CategoryIcon, category, tools } = skill;

  return (
    <div className="flex flex-col py-8 px-8 border-b border-r border-border-muted h-full">
      <div className="flex items-center gap-4 pb-8">
        <div className="border border-border-muted p-2">
          <CategoryIcon className="size-6 text-text-secondary" />
        </div>
        <p className="text-text-primary font-medium text-2xl scale-y-90">
          {category}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {tools.map((tool, index) => {
          const ToolIcon = tool.Icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <ToolIcon className="size-8 text-text-secondary shrink-0" />
              <p className="text-text-primary text-sm font-medium">{tool.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillCard;