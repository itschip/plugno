import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const places = [
  {
    id: 1,
    name: "Oslo",
  },
  {
    id: 2,
    name: "London",
  },
  {
    id: 3,
    name: "Bergen",
  },
];

export const Autocomplete = () => {
  const [selected, setSelected] = useState(places[0]);
  const [query, setQuery] = useState("");

  const regExp = new RegExp(query, "gi");

  const filteredPlaces = places.filter((place) => place.name.match(regExp));

  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden text-left shadow-md">
            <Combobox.Input
              className="w-full bg-neutral-800 border border-neutral-700 outline-none rounded-md text-white py-2 px-3 pr-10  text-gray-900"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"></Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg">
              {filteredPlaces.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPlaces.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-neutral-600 text-white" : "text-gray-400"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate &{
                            selected
                              ? "font-medium text-white"
                              : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
