export const ExtraAddOnInput = ({classes,lab,addOns, handleInputChange, handleAddInput }) => {
  // Generate time options in 30-minute intervals from 8:00 to 18:00
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 18; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Helper to extract start and end from "8:30-9:30" format
  const parseTimeRange = (range) => {
    const [startTime, endTime] = (range || '').split('-');
    return { startTime: startTime || '', endTime: endTime || '' };
  };

   const ClassList=classes.split(" ");
   const LabList=lab.split(" ");
   const Combined=[...ClassList,...LabList];
   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
   console.log(ClassList)
   console.log(LabList)
   console.log(Combined)

  return (
    <div>
      {addOns.map((addOn, index) => {
        const { startTime, endTime } = parseTimeRange(addOn.time);

        return (
          <div
            key={index}
            className="bg-gray-800/90 flex w-full md:w-[95%] min-w-[90vh] lg:w-[80%] border border-gray-500 p-8 rounded-lg shadow-xl relative z-10 mb-4"
          >
            <div className="text-white flex flex-col w-full justify-between items-center">
              <p className="text-gray-200 w-full">Extra Add-On {index + 1}</p>

              <input
                type="text"
                value={addOn.content}
                onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                placeholder="Content"
                className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10 placeholder:opacity-60"
              />

              {/* Time Range Dropdowns */}
              <div className="flex gap-4 w-full mt-4">
                <select
                  value={startTime}
                  onChange={(e) => {
                    const newTime = `${e.target.value}-${endTime || ''}`;
                    handleInputChange(index, 'time', newTime);
                  }}
                  className="w-1/2 pl-5 border-gray-600 rounded-lg bg-gray-900/80 h-10 text-white"
                >
                  <option value="">Start Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>

                <select
                  value={endTime}
                  onChange={(e) => {
                    const newTime = `${startTime || ''}-${e.target.value}`;
                    handleInputChange(index, 'time', newTime);
                  }}
                  className="w-1/2 pl-5 border-gray-600 rounded-lg bg-gray-900/80 h-10 text-white"
                >
                  <option value="">End Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <select
  value={addOn.day}
  onChange={(e) => handleInputChange(index, 'day', e.target.value)}
  className="w-full pl-5 mt-4 border-gray-600 rounded-lg bg-gray-900/80 h-10"
>
  <option value="">Select a day</option>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
  <option value="Sunday">Sunday</option>
</select>


<div className="flex gap-4 w-full mt-4">
<select
  value={addOn.sheetName || ''}
  onChange={(e) => {
    console.log('addon sheeeeeeeeeeeeetname    ::   ' + e.target.value);
    handleInputChange(index, 'sheetName', e.target.value);
  }}
  className="w-1/2 pl-5 border-gray-600 rounded-lg bg-gray-900/80 h-10 text-white"
>
  <option value="">Sheet options</option>
  {Combined.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))}
</select>
              </div>

            </div>
          </div>
        );
      })}

      <button
        onClick={handleAddInput}
        className="text-white mt-2 bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500"
      >
        + Add More
      </button>
    </div>
  );
};
