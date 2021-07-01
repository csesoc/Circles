"""
Program formats scraped / raw data by filtering out superfluous fields and 
applying minor formatting to relevant fields. It creates the file
'specialisationFormattedRaw.json'.

Within 'contentLets', relevant info includes:
 - creditPoints
 - studyLevel (e.g. 'undergraduate')
 - code (i.e. unique identifier for specialisation)
 - title (e.g. 'Accounting')
 - data (see below)
 - CurriculumStructure (see below)
 - additionalInfo
 - hb_enrolment_rules (i.e. constraints such as a maturity rule)

'data' includes, but is not limited to:
 - ELS requirements (not currently extracted)
 - structure summary
 - school detail
 - faculty detail
 - programs that the specialisation is available in
 - specialisation constraints (e.g. maturity rule)

'curriculumStructure' sets out the courses required to satisfy the specialisation.
Relevant info is located in a list of dictionaries titled 'container'. Each of 
these dictionaries includes:
 - title
 - description
 - relationship
 - dynamic_relationship
 - container 
 
The required courses are either in 'relationship', 'dynamic_relationship', or 
in deeper levels of 'container' (which has been accessed via recursion in
the below code). 

Step in the data's journey:
    [   ] Scrape raw data (specialisationScraper.py)
    [ X ] Format scraped data (specialisationFormatting.py)
    [   ] Customise formatted data (specialisationProcessing.py)
"""

import requests
import json

def format_spn_data():
    """ Extracts, processes and writes specialisation data to file """

    raw_content = get_raw_data()
    specialisations = {}
    for item in raw_content:
        
        # Unique identifier for the specialisation will be the primary key
        specCode = item["code"]

        # Setup dictionary and add data located in 'contentLets' key
        specialisations[specCode] = initialise_specialisation(item)

        # Load and process strings for further manipulation
        data = json.loads(item["data"]) 
        curriculum_structure = json.loads(item["CurriculumStructure"])

        # Add faculty and school
        specialisations[specCode]["faculty"] = data["faculty_detail"][0]["name"]
        if data["school_detail"]: # Not all specialisations have a school
            specialisations[specCode]["school"] = data["school_detail"][0]["name"]
        
        # Program availability seems be in one of two keys
        availableIn = ["available_in_programs", "available_in_programs2021plus"]
        for key in availableIn:
            get_available_in(data.get(key), specialisations, specCode)

        # Add any constraints on the specialisation
        specialisations[specCode]["constraints"] = get_constraints(data)

        # Add curriculum structure info by recursively traversing containers
        if "container" in curriculum_structure:
            get_structure(specialisations[specCode]["structure"], 
                            curriculum_structure["container"])
        
    with open('specialisationsFormattedRaw.json', 'w') as FILE:
        json.dump(specialisations, FILE)

def get_raw_data():
    """
    Returns variable containing raw specialisations data.
    """
    with open("specialisationsPureRaw.json", "r") as INPUT_FILE:
        data = json.load(INPUT_FILE)

    return data

def initialise_specialisation(item):
    """ Set up dictionary and add data in first level of 'contentLets' """

    new = {
        "title":  item.get("title"),
        "study_level": item["studyLevel"].lower(),
        "level":  item.get("level"),
        "credit_points":  item.get("creditPoints"), # Not all specialisations have credit points
        "faculty": "", 
        "school": "", # Not all specialisations have a school
        "description": item.get("description"),
        "programs": [], # Programs that the specialisation is available in
        "additional_info": item.get("additionalInfo"), # Not all specialisations have additional info
        "constraints": [], # Not all specialisations have constraints
        "structure": [], # This is where the required courses will sit
    }

    return new

def get_available_in(programs, specialisations, specCode):
    """ Adds program codes that specialisation is available in """
    
    if programs:
        for program in programs:
            specialisations[specCode]["programs"].append(program["assoc_code"])

def get_constraints(data):
    """ Returns list of dictionaries containing any constraint details for specialisation """

    constraints = []
    if data["hb_enrolment_rules"]:
        for rule in data["hb_enrolment_rules"]:
            # hb_enrolment_rules is a list of dictionaries containing each constraint
            constraint = {
                "type": rule["type"],
                "description": rule["enrolment_rule"][0]["description"]
            }
            constraints.append(constraint)

    return constraints

def get_structure(structure, currContainer):
    """ Adds curriculum structure for specialisation """

    for element in currContainer: 

        structure.append({
            "title": element["title"],
            "description": element.get("description"),
            "credit_points": element.get("credit_points"),
            "courses": [],
            "structure": [], # Structure contains required courses for a 
            # specialisation, and is represented as a list of dicitonaries
        })
        
        # If course info is in this container level, it will either be in
        # the 'relationship' or 'dynamic_relationship' key
        if "relationship" in element and element["relationship"] != []:
            for course in element["relationship"]:
                if "academic_item_code" in course:
                    # Note use of '-1' to access last (i.e. current) dictionary in 'structure'
                    structure[-1]["courses"].append(course["academic_item_code"])
                elif "description" in course and course["description"] != "":
                    # Course info may be provided as a plaintext description if 
                    # not provided as academic_item_code (e.g. 'any level 3 Finance course')
                    structure[-1]["courses"].append(course["description"])

        elif "dynamic_relationship" in element and element["dynamic_relationship"] != []:
            for course in element["dynamic_relationship"]:
                # dynamic_relationship provides course info as a plaintext description
                structure[-1]["courses"].append(course["description"])

        elif "container" in element and element["container"] != []:
            # Course info in deeper container level, so recurse and repeat
            get_structure(structure[-1]["structure"], element["container"])

if __name__ == "__main__":
    format_spn_data()