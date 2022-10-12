return function(o, ...)
    return js.new(o, table.unpack(arg))
end