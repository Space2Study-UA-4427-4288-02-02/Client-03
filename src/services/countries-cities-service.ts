import { AxiosResponse } from 'axios'

export const countriesList = [
  { name: 'Ukraine' },
  { name: 'Poland' },
  { name: 'Germany' },
  { name: 'France' },
  { name: 'Italy' },
  { name: 'Spain' },
  { name: 'United Kingdom' },
  { name: 'United States' },
  { name: 'Canada' },
  { name: 'Australia' }
]

export const citiesByCountry = {
  Ukraine: ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Dnipro', 'Zaporizhzhia'],
  Poland: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
  France: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa']
}

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const getCountries = async (): Promise<
  AxiosResponse<typeof countriesList>
> => {
  await delay()
  return Promise.resolve({ data: countriesList } as AxiosResponse<
    typeof countriesList
  >)
}

export const getCitiesByCountry = async (
  country: keyof typeof citiesByCountry
): Promise<AxiosResponse<string[]>> => {
  await delay()
  const data = citiesByCountry[country] ?? []
  return Promise.resolve({
    data: data
  } as AxiosResponse<string[]>)
}
