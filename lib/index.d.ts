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

declare type workSanity = {
    title : string,
    description : string,
    projectLink : string,
    codeLink : string,
    imgUrl : SanityImageSource,
    tags : string[]
  }