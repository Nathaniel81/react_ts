from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination

class WatchListPagination(PageNumberPagination):
    page_size = 2
class ReviewListCPagination(CursorPagination):
    page_size = 2