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
  socials: [],

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
    "Adeela Amanat is a fashion and textile designer working across lawn, pret, semi-formal and bridal wear since 2017. Her path runs from Head Designer at a textile house to founding and running an independent label end to end — which means she has sat on both sides of a seasonal collection: the artwork that starts it, and the production floor that has to deliver it.",
    "She develops digital prints, repeat patterns and engineered layouts for seasonal lawn, directs embroidery artwork and colourways, and manages sourcing, karigars and an in-house production unit. She is a gold medallist in Fashion & Textile Design from the University of South Asia, and is looking for a senior design role with a textile house.",
  ],

  statement:
    "A three-piece begins as a print, not a pattern. I design the cloth first — the repeat, the engineered placement, where the embroidery will sit — and let the garment follow from what the fabric is already saying.",

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
