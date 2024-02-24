import { useState } from 'react';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedCount = selectedIds.length;

  function handleToggle(toggledId: any) {
    // Was it previously selected?
    if (selectedIds.includes(toggledId)) {
      // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      ));
    } else {
      // Otherwise, add this ID to the array.
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}

function Letter({
    letter,
    onToggle,
    isSelected,
  }) {
    return (
      <li className={
        isSelected ? 'selected' : ''
      }>
        <label>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {
              onToggle(letter.id);
            }}
          />
          {letter.subject}
        </label>
      </li>
    )
  }
  
const letters = [{
    id: 0,
    subject: 'Ready for adventure?',
    isStarred: true,
  }, {
    id: 1,
    subject: 'Time to check in!',
    isStarred: false,
  }, {
    id: 2,
    subject: 'Festival Begins in Just SEVEN Days!',
    isStarred: false,
  }];
  