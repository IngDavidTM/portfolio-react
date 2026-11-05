const Skills = (skills) => {
  const { items, title } = skills;
  return (
    <div className="skills">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={item} style={{ '--i': index }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
