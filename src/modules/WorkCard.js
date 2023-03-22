const WorkCard = (work) => {
  const { image, title, tags } = work;
  return (
    <article className="work_card">
      <img src={image} alt={title} />
      <div className="work_card_info">
        <h3>{title}</h3>
        <div className="work_card_info_tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default WorkCard;
