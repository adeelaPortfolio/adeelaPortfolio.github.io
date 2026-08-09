import type { SiteContent } from "./types";
import manifest from "./image-manifest.json";

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT
//
// Every value below is taken from Adeela's real CV. If you change something
// here, keep it true — this site is read by recruiters who may check.
// ─────────────────────────────────────────────────────────────────────────────

export const site: SiteContent = {
  name: "Adeela",
  fullName: "Adeela Amanat",
  role: "Fashion & Textile Designer",
  tagline: "Lawn, pret and bridal — designed from the print outward.",
  location: "Lahore, Pakistan",
  email: "amanatadeela@gmail.com",

  // Add real profile links here as they exist. An empty list simply hides the
  // social row — better than linking to a handle that isn't hers.
  //
  // This is the account for Inventive Clothing, her own label, which is why the
  // label says so rather than just "Instagram" — she has no personal design
  // account. The ?igsh= tracking parameter she sent is stripped on purpose.
  socials: [
    {
      label: "Instagram — Inventive Clothing",
      href: "https://www.instagram.com/inventiveclothing_/",
    },
  ],

  // Dimensions come from the image pipeline, so both render at their true
  // aspect ratio rather than being cropped to a box.
  heroImage: {
    ...manifest.singles.hero,
    alt: "Engineered digital print panel — a floral archway over gold trellis, with a vase of blooms and fruit, shown on its side",
  },

  portrait: {
    ...manifest.singles.portrait,
    alt: "Illustrated portrait of Adeela Amanat, in a patterned indigo hijab over a block-printed shirt",
  },

  bio: [
    "I am a Fashion and Textile Designer with over nine years of industry experience across seasonal lawn, pret, semi-formal, and bridal wear. Since beginning my career in 2017, my trajectory has spanned leading roles—from serving as Head Designer at a major textile house to founding and managing an independent brand end-to-end.",
    "Having directed the entire lifecycle of seasonal collections, I bridge the gap between creative conceptualization and production execution. My core expertise lies in developing digital prints, fashion cutlines, and engineered layouts, as well as directing embroidery artwork and defining colourways. On the operational side, I oversee in-house production unit and collaborate directly with skilled karigars to deliver flawless finished collections.",
    "I hold a Gold Medal in Fashion & Textile Design from the University of South Asia. I am currently seeking a Senior Design role with a forward-thinking textile house where I can leverage both my creative vision and production leadership.",
  ],

  skills: [
    "Digital textile print development",
    "Repeat patterns & engineered layouts",
    "Colourways & palette direction",
    "Fabric surface treatment",
    "Hand & multi-head embroidery",
    "Embellishment techniques",
    "Pattern making, cutting & cutlines",
    "Garment stitching & sample development",
    "Weaving",
    "Fashion illustration — by hand and in Photoshop",
    "Adobe Photoshop",
    "Digital photography (Nikon D7000, 35mm)",
  ],

  education: [
    {
      qualification: "Bachelor's (Hons) Fashion & Textile Design — CGPA 3.86, Gold Medallist",
      institution: "University of South Asia, Lahore",
      years: "2011 – 2015",
    },
    {
      qualification: "Intermediate — Science",
      institution: "Punjab Group of Colleges, Lahore",
      years: "2009 – 2011",
    },
    {
      qualification: "Matriculation",
      institution: "Kirdar School System, Lahore",
      years: "2007 – 2009",
    },
  ],

  // Awards, thesis and research — real recognition, no press features.
  press: [
    {
      title: "Gold Medal — Tamgha-e-Quaid",
      kind: "Award",
      year: "2015",
    },
    {
      title: "Gold Medal in Graduation",
      kind: "Award",
      year: "2015",
      detail: "Fashion & Textile Design, University of South Asia",
    },
    {
      title: "Redefining the Ottoman Queen",
      kind: "Thesis",
      year: "2015",
      detail: "Final-year thesis collection, University of South Asia",
    },
    {
      title: "Attitude of Youth on Fashion",
      kind: "Research",
      year: "2015",
      detail: "Research report",
    },
    {
      title: "University Fashion Show",
      kind: "Runway",
      year: "2015",
      detail: "Designed dresses for the University of South Asia show",
    },
  ],

  cvPath: "/cv/adeela-cv.pdf",
};
