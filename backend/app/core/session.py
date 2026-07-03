class Session:

    def __init__(self):
        self.website = ""

    def set_website(self, website: str):
        self.website = website

    def get_website(self):
        return self.website


session = Session()