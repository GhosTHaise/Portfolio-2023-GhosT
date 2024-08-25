declare type experience = {
    year: string,
    works: workExperience[]
}

declare type skills = {
    name: string,
    bgColor: string,
    icon: SanityImageSource
}

declare type workExperience = {
    name: string,
    company: string,
    companyLogo: SanityImageSource,
    desc: string
  }