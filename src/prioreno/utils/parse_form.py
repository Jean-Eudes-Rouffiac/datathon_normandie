def parse(data_str):
    result = dict()
    if data_str:
        for data in data_str.split("&"):
            elements = data.split("=")
            key = elements[0]
            if "%20" in elements[1]:
                value = elements[1].replace("%20", " ")
            else:
                value = elements[1]
            result[key] = value

    return result