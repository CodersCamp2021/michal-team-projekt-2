import { AddObjectForm } from './AddObjectForm';

export function AddObject() {
  const saveData = (data) => {
    console.log(data);
  };
  return <AddObjectForm saveData={saveData} />;
}
