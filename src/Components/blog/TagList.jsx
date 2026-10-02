const TagList = ({ tags }) => (
  <ul aria-label="Tags" className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <li
        key={tag}
        className="text-neutral-400 text-xs px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full"
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default TagList;
