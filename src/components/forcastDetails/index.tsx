// import { useTranslation } from 'react-i18next';

// import { FormattedWeatherData } from '../../hooks';

// // import BarChart from '../chart'

// // import { Weather } from '../../types'


// const WeatherDetails = ({ weather, unit }: { weather: FormattedWeatherData | null; unit: string}) => {
//   const { t } = useTranslation();
//   return (
//     <div>
//           {weather && (
//               <>
//                   {/* <div className="">
//                       <BarChart
//                           data={{
//                               humidity: weather.humidity,
//                               feelsLike: weather.feels_like,
//                               windSpeed: weather.speed,
//                               temperature: weather.temp,
//                           }} />
//                   </div> */}
//                   <div>
//                       {/* weather details */}
//                       <div className="p-3">
//                           <ul className="">
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("location")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.name}, {weather.country}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Temperature")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.temp.toFixed()}°{unit === 'metric' ? 'C' : 'F'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate capitalize">
//                                           {t("latitude")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.lat}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate capitalize">
//                                           {t("longitude")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.lon}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Description")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.description}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Temperature")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.temp}°{unit === 'metric' ? 'C' : 'F'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Min Temperature")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.temp_min}°{unit === 'metric' ? 'C' : 'F'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Max Temperature")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.temp_max}°{unit === 'metric' ? 'C' : 'F'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Feels Like")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.feels_like}°{unit === 'metric' ? 'C' : 'F'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Humidity")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.humidity}%
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Wind Speed")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.speed} {unit === 'metric' ? 'm/s' : 'mph'}
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Pressure")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {weather.pressure} hPa
//                                       </p>
//                                   </div>
//                               </li>
//                               <li className="pb-3 sm:pb-4">
//                                   <div className="flex items-center justify-between">
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {t("Precipitation")}
//                                       </p>
//                                       <p className="text-sm font-medium text-gray-900 truncate">
//                                           {/* {weather.rain ? `${weather.rain['1h']} mm` : '0 mm'} */}
//                                       </p>
//                                   </div>
//                               </li>
//                           </ul>

//                       </div>
//                   </div>
//               </>
//           )}
//     </div>
//   )
// }

// export default WeatherDetails