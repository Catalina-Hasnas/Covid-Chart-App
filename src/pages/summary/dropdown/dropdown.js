import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const Dropdown = ({countries, setActiveCountry}) => {

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    console.log(countries);
    return (
        <Menu as="div" className="relative inline-block text-left">
          <div className="mt-3">
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-pink-500">
              Choose a country
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="h-44 overflow-scroll origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                  {countries.map( (country, index) => { 
                    return (
                      <Menu.Item key={index} onClick={(e) => setActiveCountry(e.target.text)}>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                {country.Country}
                            </a>
                        )}
                        </Menu.Item>
                  )
                  })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
    )
}

export default Dropdown