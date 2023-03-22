const Skills = (skills) => {
  const { items, title } = skills;
  return (
    <div className="skills">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
