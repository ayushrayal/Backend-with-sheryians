import"../NoteList/noteList.css"
const NoteList = ({ notes }) => {
  return (
    <>
      {notes?.map((note,idx) => {
        return (
          <div className="note" key={idx}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            
          </div>
        );
      })}
    </>
  );
};

export default NoteList;