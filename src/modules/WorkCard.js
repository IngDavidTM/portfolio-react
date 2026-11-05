const WorkCard = (work) => {
  const {
    image, title, tags, onOpen,
  } = work;
  return (
    <button type="button" className="work_card" onClick={onOpen}>
      <img src={image} alt={title} loading="lazy" />
      <span className="work_card_info">
        <span className="work_card_title">{title}</span>
        <span className="work_card_info_tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </button>
  );
};

export default WorkCard;
