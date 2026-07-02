class ProgressManager:

    def __init__(self):
        self.reset()

    def reset(self):
        self.status = "idle"
        self.current = 0
        self.total = 0
        self.current_page = ""
        self.result = None

    def start(self, total):
        self.status = "indexing"
        self.current = 0
        self.total = total
        self.current_page = ""
        self.result = None

    def update(self, current, page):
        self.current = current
        self.current_page = page

    def finish(self, result):
        self.current = self.total
        self.status = "completed"
        self.result = result

    def get(self):

        percentage = 0

        if self.total > 0:
            percentage = int(
                (self.current / self.total) * 100
            )

        return {
            "status": self.status,
            "current": self.current,
            "total": self.total,
            "percentage": percentage,
            "page": self.current_page,
            "result": self.result,
        }


progress = ProgressManager()